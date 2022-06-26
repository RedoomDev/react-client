import AdSense from 'react-adsense';


export function ReklamPostContent() {
   return (
      <AdSense.Google
         client='ca-pub-7430781456275062'
         slot='4298293264'
         style={{ display: 'block' }}
         format='fluid'
         responsive='true'
         layoutKey='in-article'
      />
   )
}

export function ReklamDikey() {
   return (
      <AdSense.Google
         client='ca-pub-7430781456275062'
         slot='7708970950'
         style={{ display: 'block' }}
         format='autorelaxed'
         responsive='true'
      />
   )
}

export function ReklamNormal() {
   return (
      <AdSense.Google
         client='ca-pub-7430781456275062'
         slot='4437894067'
         style={{ display: 'block' }}
         format='auto'
         responsive='true'
      />
   )
}