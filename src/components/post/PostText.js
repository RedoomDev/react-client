import React from 'react'
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';


export default function PostText({ text }) {

   let replacedText;

   replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
      <a key={match + i} href={match}>{match}</a>
   ));

   replacedText = reactStringReplace(replacedText, /#(\w+)/gim, (match, i) => (
      <Link>
         #{match}
      </Link>
   ));

   replacedText = reactStringReplace(replacedText, /\n/, (match, i) => (
      <div style={{ marginTop: 10 }}>&#160;&#160;{match}</div>
   ));

   return (
      <span className="post-content-text" style={{ fontSize: Number(localStorage.getItem("contentTextSize")) || 18 }} id="preview">
         &#160;&#160;{replacedText}
      </span>
   )

}