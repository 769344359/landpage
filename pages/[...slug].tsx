import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";
export async function getServerSideProps(context) {
  const { params, query } = context;

  return { props: { params: params, query: query } };
}
export default function IndexPage(context: any) {
  console.log(context);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isQueryFriendLoading, setIsQueryFriendLoading] = useState(false);
  const [cardKey, setCardKey] = useState<string>(context.params.slug[0]);
  const [pincode, setPincode] = useState(context.params.slug[1]);
  const [uid, setUid] = useState("");
  const [image, setImage] = useState("");
  const queryFriend = () => {
    var myHeaders = new Headers();
    var formdata = new FormData();

    formdata.append("goodsId", parseInt(cardKey) + "");
    formdata.append("carmi", pincode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch("https://card.papapis.com/getPath", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsQueryFriendLoading(false);
        console.log(result);
        ////
        let respJson = JSON.parse(result);

        if (respJson.status == 0 && respJson.info.length > 0) {
          console.log("set image");
          setImage(respJson.image);
        }
        /////
      })
      .catch((error) => console.log("error", error));
  };
  const addFriend = () => {
    setIsAddLoading(true);

    var myHeaders = new Headers();

    var formdata = new FormData();

    formdata.append("goodsId", parseInt(cardKey) + "");
    formdata.append("carmi", pincode);
    formdata.append("uid", uid + "");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch("https://card.papapis.com/submit", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);

        setIsAddLoading(false);
        if (obj.status == 0) {
          toast.success(obj.info);
        } else {
          toast.error(obj.info);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast("请求失败");
      });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div> */}
        <Input
          isReadOnly
          className="max-w-xs"
          defaultValue=""
          label="key(不可修改)"
          value={cardKey}
        />
        <Input
          isReadOnly
          className="max-w-xs"
          defaultValue=""
          label="卡密(不可修改)"
          value={pincode}
        />
        <Input
          isClearable
          isRequired
          className="max-w-xs"
          label="宝可梦ID"
          value={uid}
          onValueChange={setUid}
	  type="text"
        />
        <Button color="primary" isLoading={isAddLoading} onPress={addFriend}>
          提交添加好友
        </Button>

        <Button
          color="success"
          isLoading={isQueryFriendLoading}
          onPress={queryFriend}
        >
          查询添加好友截图
        </Button>
        <Toaster />
        <Image
          alt="NextUI hero Image"
          fallbackSrc={image}
          src={image}
          width={300}
        />
      </section>
    </DefaultLayout>
  );
}
