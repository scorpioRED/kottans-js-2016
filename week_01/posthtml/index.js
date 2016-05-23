const PostHTML = require('posthtml');
const fs = require('fs');
const html = fs.readFileSync('index.html','utf-8');
const bootstrapClasses = fs.readFileSync('bootstrapClasses','utf8').replace(/\n/g,'').split('.').slice(1);

const pattern = /js-/;

const removeClass = (allClasses,node,classToRemove) =>{
    if(allClasses.length == 1){
        delete node.attrs.class
    }else {
        node.attrs.class = node.attrs.class.replace(classToRemove,'').replace(' ', '')
    }
}


const plugin = inHtml =>
    inHtml
        .match({ attrs: { class: true }}, node =>{
            let allClasses = node.attrs.class.split(' ');
            allClasses.forEach( classToRemove => {
                if(bootstrapClasses.indexOf(classToRemove) != -1){
                    removeClass(allClasses,node,classToRemove);
                } else {
                    if(pattern.test(classToRemove)){
                        node.attrs['data-js'] = classToRemove.split('-')[1];
                        removeClass(allClasses,node,classToRemove)
                    }
                }
            })

        return node

    })


PostHTML([ plugin ])
    .process(html)
    .then(result =>
    {
        console.log(result.html)
    })
    .catch(console.error)