import React, { useEffect, useState } from "react";
import axios from "axios";
import { backUrl } from "../../config/config";

export default function Header() {
  const [islogin, setislogin] = useState(false);

  useEffect(() => {
    const refresh = window.localStorage.getItem("refresh_token");
    if (refresh == null) {
      setislogin(false);
    } else {
      axios
        .post(backUrl + "/api/user/refresh/", { refresh: refresh })
        .then(function (response) {
          window.localStorage.setItem("access_token", response.data.access);
          console.log("acc", response);
          setislogin(true);
        })
        .catch(function (error) {
          setislogin(false);
          console.log(error);
          window.localStorage.clear();
        });
    }
  }, []);

  return (
    <>
      <header className=" bg-[#42DDBB]  h-20 text-white body-font">
        <div className=" pt-5 ml-20 mr-20 pl-20 pr-20 flex justify-between flex-col container md:flex-row items-center">
          <a
            className="text-white flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/#"
          >
            <img className="w-10 h-10" src="../../icon.png" />
            <span className="font-custom ml-3 text-[#FFD15C] text-[30px]">
              배
            </span>
            <span className="font-custom text-[30px]">나온</span>
          </a>
          <nav className="md:ml flex flex-wrap items-center text-base justify-center">
            <a className="font mr-5 hover:text-gray-900" href="/#">
              Home
            </a>
            <a className="mr-5 hover:text-gray-900" href="/categorypost">
              게시글
            </a>
            <a className="mr-5 hover:text-gray-900" href="/postForm">
              글쓰기
            </a>
            {islogin ? (
              <div>
                <a className="mr-5 hover:text-gray-900" href="/useprofile">
                  마이페이지
                </a>
                <a className="mr-5 hover:text-gray-900" href="/logout">
                  로그아웃
                </a>
              </div>
            ) : (
              <a className="mr-5 hover:text-gray-900" href="/loginform">
                로그인
              </a>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
