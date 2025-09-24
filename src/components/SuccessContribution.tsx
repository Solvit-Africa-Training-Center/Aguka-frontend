import { FiCheckCircle } from "react-icons/fi";
const SuccessContribution = () => {
  return (
    <div className="bg-[#D9E9EB] h-20 place-items-center w-20">
      <div className="relative top-40 ">
        <span className="text-[#43A047] ">
          <FiCheckCircle className="size-10 ml-25 mb-2" />
        </span>
        <span className="text-2xl">Contribution Successfull</span>
      </div>
    </div>
  );
};

export default SuccessContribution;
