import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../reducers/post";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import Router from "next/router";
import { useHistory } from "react-router-dom";

const PostForm = () => {
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);
  // const { addPostDone, addPostLoading } = useSelector((state) => state.user);
  const router = useRouter();
  const address1 = router.query.address;
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, onChangeContent, setContent] = useInput("");
  // const [category, onChangeCategory, setCategory] = useInput("");
  const dispatch = useDispatch();
  const address_id = router.query.id;

  const [address2, setaddress2] = useState({});
  const [access_token, set_access_token] = useState({});
  const [category, set_Menu] = useState("");

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    if (address1 != null) {
      setaddress2(JSON.parse(address1));
    }
  }, [address1, access_token]);

  const setMenu = useCallback((e) => {
    set_Menu(e.target.value);
  });

  const onSubmit = useCallback(
    (e) => {
      const formData = {
        access_token: access_token,
        send: {
          title: title,
          content: content,
          category: category,
          address_id: address_id,
        },
      };

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
      e.preventDefault();
      setTimeout(() => {
        if (window.localStorage.getItem("post_success") === "true") {
          Router.push("/map");
        } else {
          Router.push("/loginform");
        }
      }, 1000);
    },
    [title, content]
  );
  console.log(category);
  return (
    <div>
      <Header />
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[700px]">
          <div className="mb-9">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              {/*{address2.addressname}*/}내 위치
            </label>
            <label
              className="mb-3 block text-base font-light

             text-[#07074D]"
            >
              {address2.locationname}&nbsp; /&nbsp; {address2.addressname}
            </label>
          </div>
          <form onSubmit={onSubmit}>
            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                음식 종류
              </label>
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                {`${category}`}
              </label>
              <div class="flex items-center justify-center mb-3">
                <div
                  class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                  role="group"
                >
                  <button
                    onClick={setMenu}
                    type="button"
                    value="한식"
                    class="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    한식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="중식"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    중식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="일식"
                    class="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    일식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="치킨"
                    class="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    치킨
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="분식"
                    class="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    분식
                  </button>
                  <button
                    onClick={setMenu}
                    type="button"
                    value="카페/디저트"
                    class="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    카페/디저트
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <label
                for="subject"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                제목
              </label>
              <input
                onChange={onChangeTitle}
                value={title}
                type="text"
                placeholder="제목을 입력하세요."
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></input>
            </div>
            <div class="mb-5">
              <label
                for="message"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                내용
              </label>
              <textarea
                onChange={onChangeContent}
                rows="9"
                id="message"
                placeholder="내용을 입력하세요."
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
                onClick={onSubmit}
                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              >
                글 올리기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
