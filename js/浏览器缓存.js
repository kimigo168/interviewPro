// 缓存分多种，浏览器缓存，DNS缓存，反向代理Nginx缓存等等...

// 浏览器缓存：
// 由来：
// 当浏览器请求一些网站，会加载各种资源，比如html,css,js,图片等。对于一些不经常变的，浏览器会将他们保存在本地文件夹中，下次访问相同的网站，直接加载这些资源，加速访问。

// 如果知晓浏览器读取缓存还是请求服务器？
// F12,Network,看size是否具体数值，还是from disk cache还是from memory cache

// 浏览器是否使用缓存，缓存多久，由服务器控制。
// 缓存分为：强缓存和协商缓存

// 一、强缓存： Expires & Cache-Control
// 强缓存，返回http 状态200，size显示from cache，利用Expires或Cache-Control这两个http response header，来表示资源在客户端的缓存的有效期。

// Expires:描述一个绝对时间，GMT,
// 1.浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在response的header加上Expires的header
// 2.浏览器在接收到这个资源后，会把这个资源连同所有response header一起缓存下来（所以缓存命中的请求返回的header并不是来自服务器，而是来自之前缓存的header）；
// 3.浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，拿出它的Expires跟当前的请求时间比较，如果请求时间在Expires指定的时间之前，就能命中缓存，否则就不行；
// 4.如果缓存没有命中，浏览器直接从服务器加载资源时，Expires Header在重新加载的时候会被更新；
// 问题：由于它是服务器返回的一个绝对时间，在服务器时间与客户端时间相差较大时，缓存管理容易出现问题

// Cache-Control：这是一个相对时间，在配置缓存的时候，以秒为单位，用数值表示Cache-Control:max-age=315360000，它的缓存原理是：
// 1.浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在response的header加上Cache-Control的header
// 2.浏览器在接收到这个资源后，会把这个资源连同所有response header一起缓存下来
// 3.浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，根据它第一次的请求时间和Cache-Control设定的有效期，计算出一个资源过期时间，再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则就不行
// 4.如果缓存没有命中，浏览器直接从服务器加载资源时，Cache-Control Header在重新加载的时候会被更新
// 5.可以为 Cache-Control 指定 public 或 private 标记。如果使用 private，则表示该资源仅仅属于发出请求的最终用户，这将禁止中间服务器（如代理服务器）缓存此类资源

// cache-control 优先级高于 Expires

// 二、协商缓存（Last-Modified & Etag）
// 当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中，如果协商缓存命中，请求响应返回的http状态为304并且会显示一个Not Modified的字符串
// f12 304 Not Modified
// 查看单个请求的Response Header，也能看到304的状态码和Not Modified的字符串，只要看到这个就可说明这个资源是命中了协商缓存，然后从客户端缓存中加载的，而不是服务器最新的资源：

// 协商缓存是利用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对Header来管理的。

// Last-Modified，If-Modified-Since原理：
// 1.浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在response的header加上Last-Modified的header，这个header表示这个资源在服务器上的最后修改时间：(GMT)
// 2.浏览器再次跟服务器请求这个资源时，在request的header上加上If-Modified-Since的header，这个header的值就是上一次请求时返回的Last-Modified的值：
// 3.服务器再次收到资源请求时，根据浏览器传过来If-Modified-Since和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。
// 4.浏览器收到304的响应后，就会从缓存中加载资源。
// 5.如果协商缓存没有命中，浏览器直接从服务器加载资源时，Last-Modified Header在重新加载的时候会被更新，下次请求时，If-Modified-Since会启用上次返回的Last-Modified值。

// 问题:
// 【Last-Modified，If-Modified-Since】都是根据服务器时间返回的header，一般来说，在没有调整服务器时间和篡改客户端缓存的情况下，这两个header配合起来管理协商缓存是非常可靠的，但是有时候也会服务器上资源其实有变化，但是最后修改时间却没有变化的情况，而这种问题又很不容易被定位出来，而当这种情况出现的时候，就会影响协商缓存的可靠性。

// 【ETag、If-None-Match】原理:
// 1.浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在response的header加上ETag的header，这个header是服务器根据当前请求的资源生成的一个唯一标识，这个唯一标识是一个字符串，只要资源有变化这个串就不同,跟最后修改时间没有关系，所以能很好的补充Last-Modified的问题：
// 2.浏览器再次跟服务器请求这个资源时，在request的header上加上If-None-Match的header，这个header的值就是上一次请求时返回的ETag的值：
// 3.服务器再次收到资源请求时，根据浏览器传过来If-None-Match和然后再根据资源生成一个新的ETag，如果这两个值相同就说明资源没有变化，否则就是有变化；如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化
// 4.浏览器收到304的响应后，就会从缓存中加载资源。



