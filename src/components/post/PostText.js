import React from 'react'
import { unified } from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { RemarkH1, RemarkH2, RemarkH3, RemarkH4, RemarkH5, RemarkH6 } from './remark/htags';
import { RemarkCode } from './remark/code';
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { RemarkImg } from './remark/image';
var oembed = require('@agentofuser/remark-oembed')

export default function PostText({ text }) {



   let content = unified()
      .use(parse)
      .use(oembed)
      .use(remarkGfm)
      .use(remarkBreaks)
      .use(remark2react, {
         createElement: React.createElement,
         remarkReactComponents: {
            h1: RemarkH1,
            h2: RemarkH2,
            h3: RemarkH3,
            h4: RemarkH4,
            h5: RemarkH5,
            h6: RemarkH6,
            code: RemarkCode,
            img: RemarkImg
         }
      })
      .processSync(text + "  https://www.youtube.com/watch?v=GN0xHSk2P8Q").result;



   return (
      <span className="post-content-text" id="preview">
         {content}
      </span>
   )

}