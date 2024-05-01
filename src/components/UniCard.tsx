import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
// import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getUniData } from "../api/actions";

const UniCard: React.FC = () => {
  const [data, setData] = useState<UniData>();
  const [loadingState, setLoadingState] = useState(false);
  const [Uni, setUni] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Uni Data...");
    console.log(Uni);
    setLoadingState(true);
    getUniData(Uni)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="Uniname"
              type="text"
              label="Uni"
              value={Uni}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUni(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">{data.Uni}</h1>
          {data.Students > 50 && data.Fees > 50 ? (
            <div>
              {/* <RiEmotionHappyLine className="w-36 h-36" /> */}
            </div>
          ) : (
            <div>
              {/* <RiEmotionUnhappyLine className="w-36 h-36" /> */}
            </div>
          )}
          <p className="text-xl">Students: {data.Students} mph</p>
          <p className="text-lg">Fees: £ {data.Fees} </p>
          <p className="text-lg">Rank: {data.Rank} </p>
          <p className="text-lg">Admission: {data.Admission} </p>
        </div>
      </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a name of University</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UniCard;
