/**
 * Created by Administrator on 2017/3/26.
 */
var request=require('request');
var iconv=require('iconv-lite')
var cheerio=require('cheerio')
var debug=require('debug');
let logger=debug('crawl:read')
module.exports=function (url, cb) {
    request({url,encoding:null},function (err, res, body) {
        body=iconv.decode(body,'gbk');
        var movies=[];
        var $=cheerio.load(body)
        $('.keyword .list-title').each(function () {
            var $this=$(this);
            var movie={
                name:$this.text(),
                url:$this.attr('href')
            }
            logger(`读取到电影:${movie.name}`)
            movies.push(movie)
        })
        cb(err,movies)


    })
}
