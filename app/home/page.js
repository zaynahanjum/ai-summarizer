
import React from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-50">
        <img src="	https://shopwisely.org/_next/image?url=%2Fimages%2Fbrand%2Ficon.png&w=640&q=75" alt="Logo" className="w-25 h-25 mb-2" >
        </img>
      <h1 className="text-[52px] font-bold  mb-4">
       AI Summary for Amazon Reviews
      </h1>
      <p className="text-[22px] text-gray-600 max-w-[70%] text-center mb-6 leading-8">
       Wisely scans Amazon product pages as you visit them, and shows useful insights to save you time, uncover red flags, and ensure you choose the best product every time
      </p>
      <div className="flex gap-4 items-center justify-center ">
        <a
          href="/help"
          className="px-8 py-4 bg-[#0284C7] text-white text-[22px] font-semibold rounded-[7px] hover:bg-[#086b9d] transition flex fex-row gap-2.5 "
        >
            <svg 
  stroke="currentColor"
  fill="currentColor"
  strokeWidth="0"
  viewBox="0 0 16 16"
  height="1.5em"
  width="1.5em"
  xmlns="http://www.w3.org/2000/svg
  "
>
  <path className="items-center flex justify-center "
    fillRule="evenodd"
    d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
  />
</svg>

        Add to Chrome
        </a>
       
      </div>
      <div >
        <img src="https://shopwisely.org/_next/image?url=%2Fimages%2Fhelp%2Fshowcase.png&w=1920&q=75" className="mt-20 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-gray-200 shadow-gray-500 w-250" >
        </img>
      </div>
      <div className="flex flex-col items-center justify-center py-8 bg-gray-50">
  <h2 className="text-lg font-semibold mb-6 mt-20">As seen on:</h2>
  <div className="flex flex-wrap items-center justify-center  gap-25">
    <div>
    <img
      src="https://shopwisely.org/_next/image?url=%2Fimages%2Fmedia%2Fthe-rundown-ai.png&w=640&q=75"
      alt="The Rundown AI"
      className="h-20 w-auto"
    />
    <p className="-ml-4">The Rundown AI</p>
    </div>
    <div>
    <img
      src="	https://shopwisely.org/_next/image?url=%2Fimages%2Fmedia%2Fsuperpower-daily.png&w=640&q=75"
      alt="Superpower Daily"
      className="h-20 w-auto"
    />
    <p className="-ml-4">Superpower Daily</p>
    </div>
    <div>
    <img
      src="https://shopwisely.org/_next/image?url=%2Fimages%2Fmedia%2Frobot-pigeon.png&w=640&q=75"
      alt="Robot Pigeon"
      className="h-20 w-auto"
    />
    <p className="-ml-4">Robot Pigion</p>
    </div>
    <div>
    <img
      src="	https://shopwisely.org/_next/image?url=%2Fimages%2Fmedia%2Fthe-prompt.png&w=640&q=75"
      alt="ThePrompt"
      className="h-20 w-auto"
    />
    <p className="-ml-2 ">The Prompt</p>
    </div>
  </div>
</div>

<div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-20 px-6 py-16 ">
  

  <div className=" flex justify-center">
    <img
      src="	https://shopwisely.org/_next/image?url=%2Fimages%2Fhelp%2Fbox.png&w=1920&q=75" 
      alt="Wisely preview"
      className="w-120 rounded-xl shadow-lg"
    />
  </div>

 
  <div className="w-full md:w-1/2">
    <h2 className="text-[40px] font-bold text-gray-900 mb-6">
      How does it work?
    </h2>

    <p className="text-gray-500 leading-relaxed mb-8 text-[20px]">
      Wisely scans and analyzes any Amazon.com product page as you visit it,
      and then provides you with quick useful insights, such as:
    </p>

    <ul className="space-y-8 text-gray-600">
      
      <li className="flex gap-3 text-[18px]">
        <span className="text-lg">
           <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"             
  stroke="black"           
  strokeWidth="2"         
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77l-6.18 3.23L7 14.13 2 9.26l6.91-1L12 2z"
  />
</svg>
 
        </span>
        <p>
          <span className="font-semibold">Visual ratings breakdown</span> that
          shows the distribution of customer ratings in an easy-to-understand
          format
        </p>
      </li>

      <li className="flex gap-3 text-[18px]">
        <span className="text-lg">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  stroke="currentColor"
  strokeWidth="0"
  className="w-6 h-6 text-black"
  aria-hidden="true"
>
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
</svg>

        </span>
        <p>
          <span className="font-semibold">Summary of top pros and cons</span> by
          analyzing customer reviews
        </p>
      </li>

      <li className="flex gap-3 text-[18px]">
        <span className="text-lg">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  stroke="currentColor"
  strokeWidth="0"
  className="w-6 h-6 text-black"
  aria-hidden="true"
>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
</svg>

        </span>
        <p>
          <span className="font-semibold">Things you should know</span> such as
          red flags, important product info, or unhealthy ingredients
        </p>
      </li>

      <li className="flex gap-3 text-[18px]">
        <span className="text-lg">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  className="w-6 h-6 text-black"
>
  <path
    fillRule="evenodd"
    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
  />
</svg>

        </span>
        <p>
          <span className="font-semibold">Notable product features</span> that
          make this product unique
        </p>
      </li>

    </ul>
  </div>
</div>


 <h1 className="text-[52px] font-bold  mb-4 pt-27">
       Ready to start shopping wisely?
      </h1>
      <p className="text-[22px] text-gray-600 max-w-[70%] text-center mb-6 leading-8">
      Add the Wisely Chrome extension to get useful insights for Amazon products
      </p>
      <div className="flex gap-4 items-center justify-center ">
        <a
          href="/help"
          className="px-8 py-4 bg-[#0284C7] text-white text-[22px] font-semibold rounded-[7px] hover:bg-[#086b9d] transition flex fex-row gap-2.5 mb-70 "
        >
            <svg 
  stroke="currentColor"
  fill="currentColor"
  strokeWidth="0"
  viewBox="0 0 16 16"
  height="1.5em"
  width="1.5em"
  xmlns="http://www.w3.org/2000/svg
  "
>
  <path className="items-center flex justify-center "
    fillRule="evenodd"
    d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
  />
</svg>

        Add to Chrome
        </a>
        </div>


    </main>
  );
}
