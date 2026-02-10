import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Share() {
  return (
     <div>
      <Header/>
    <div className="relative min-h-screen bg-white flex items-center justify-center">

    
      <div className="absolute w-75 h-75 bg-[#30d5c8] rounded-4xl blur-3xl opacity-20 bottom-10 left-90 pointer-events-none"></div>
       <div className="absolute w-60 h-60 bg-blue-200 rounded-4xl blur-3xl opacity-20 bottom-3 left-10 pointer-events-none"></div>

    
      <div className="flex flex-col items-center  max-w-xl w-full px-6">

        <h1 className="text-4xl text-center md:text-5xl font-bold mb-10">
          Spread the word!
        </h1>
   <div className="flex flex-col pl-18">
        <h2 className="text-[20px] font-semibold">
          Enjoying Wisely?
        </h2>

        <p className="text-[17px] text-gray-600 mb-8">
          Share it and help us spread the word!
        </p>

        <h2 className="text-[18px] font-semibold mb-4">
          Share on social media:
        </h2>

        <div className="flex gap-3 mt-3">
          <a
            href="https://shopwisely.org/images/social-icons/twitter.svg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://shopwisely.org/images/social-icons/twitter.svg" className="h-15 w-15" />
          </a>

          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/facebook.svg" className="h-15 w-15" />
          </a>
       <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/pinterest.svg" className="h-15 w-15" />
          </a>
        <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/reddit.svg" className="h-15 w-15" />
          </a>

          
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://shopwisely.org/images/social-icons/linkedin.svg" className="h-15 w-15" />
          </a>
</div> <h2 className="text-[18px] font-semibold  mt-4">
          Message a friend:
        </h2>

        <div className="flex gap-3 mt-3">
          <a
            href="https://shopwisely.org/images/social-icons/twitter.svg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://shopwisely.org/images/social-icons/email.svg" className="h-15 w-15" />
          </a>

          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/messenger.svg" className="h-15 w-15" />
          </a>
       <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/whatsapp.svg" className="h-15 w-15" />
          </a>
        <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src="https://shopwisely.org/images/social-icons/telegram.svg" className="h-15 w-15" />
          </a>

          
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fshopwisely.org%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://shopwisely.org/images/social-icons/signal.svg" className="h-15 w-15" />
          </a>
</div>
        </div>

      </div>
     
    </div>
     <Footer/>
   </div>
  );
}
