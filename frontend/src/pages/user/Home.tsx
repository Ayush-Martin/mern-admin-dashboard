import bg1 from "../../assets/bg1.jpg";
import { Header } from "../../components";

const Home = () => {
  return (
    <div className="relative">
      <img src={bg1} className="object-cover w-screen h-screen" />
      <Header/>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="flex flex-col gap-16 m-auto bg-white rounded-md p-7 bg-opacity-10 w-96 "></div>
      </div>
    </div>
  );
};

export default Home;
