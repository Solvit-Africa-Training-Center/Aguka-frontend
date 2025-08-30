import image from "assets/image/avatar.png";

// type Props = {};

const Hero = () => {
  return (
    <div className="bg-primary-700/70 flex  min-h-screen font-poppins">
      <div className=" mt-40 flex flex-cols-2 p-5 gap-10 w-full ">
        <div className="w-200 ">
          <h2 className="text-7xl text-white  capitalize space-y-4 font-poppins font-bold">save together,</h2>
          <h2 className="text-7xl text-amber-500 space-y-4 ">grow together</h2>
          <p className="w-100 text-white text-4xl">
            Join thousands building wealth through community-powered tontine
            circles. Pool your savings, take turns receiving, and achieve your
            financial goals faster.
          </p>
        </div>
        <div className="w-120">
          <img src={image} alt="avatar community" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
