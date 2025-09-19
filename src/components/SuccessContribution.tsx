import { FiCheckCircle } from "react-icons/fi";
type Props = {};

const SuccessContribution = () => {
  return (
    <div className="bg-[#D9E9EB] min-h-screen place-items-center w-full">
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
