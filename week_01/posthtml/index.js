const PostHTML = require('posthtml');
const fs = require('fs');
const html = fs.readFileSync('index.html','utf-8');
const bootstrapClsses = fs.readFileSync('bootstrapClasses','utf8').replace(/\n/g,'').split('.').slice(1);

const pat = /js-/;

const ifOne = (tmp,node,elClass) =>{
    if(tmp.length == 1){
        delete node.attrs.class
    }else {
        node.attrs.class = node.attrs.class.replace(elClass,'').replace(' ', '')
    }
}


const plugin = inHtml =>
    inHtml
        .match({ attrs: true}, node =>{

        if(node.attrs.class){
            let tmp = node.attrs.class.split(' ');
            tmp.forEach( elClass => {
                if(bootstrapClsses.indexOf(elClass) != -1){
                    ifOne(tmp,node,elClass);
                }else {
                    if(pat.test(elClass)){
                        node.attrs['data-js'] = elClass.split('-')[1];
                        ifOne(tmp,node,elClass)
                    }
                }
            })
        }

        return node

    })


PostHTML([ plugin ])
    .process(html)
    .then(result =>
    {
        console.log(result.html)
    })
    .catch(console.error)