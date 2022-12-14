import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../pages/components/header";
import Comment from "../pages/comment";
import { LOAD_POST_REQUEST, REMOVE_POST_REQUEST } from "../reducers/post";
import { useRouter } from "next/router";
import CommentForm from "../pages/commentForm";
import Link from "next/link";

const Content = ({}) => {
  const { singlePost } = useSelector((state) => state.post);
  const { AllPost } = useSelector((state) => state.post);
  const router = useRouter();
  const address1 = router.query.address;
  const dispatch = useDispatch();
  const id = router.query.id;

  const [access_token, set_access_token] = useState({});
  const [address2, setaddress2] = useState({});

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    if (address1 != null) {
      setaddress2(JSON.parse(address1));
    }
  }, [address1]);

  const [commentText, setCommentText] = useState("");

  // const access_token = `"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNqYTk3MDdAZGF1bS5uZXQiLCJleHAiOjE2NjMxNjExMzAsImVtYWlsIjoic2phOTcwN0BkYXVtLm5ldCJ9.tqnzK4CCn-wLGUmNJJdf81HUlvXgjP2t2sWt3XkMWCE"`;
  const address_id = 1;

  const onChangeText = (e) => {
    e.preventDefault();
    set_access_token(window.localStorage.getItem("access_token"));
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    useEffect(() => {});
  };

  const onRemove = (e) => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { id: address_id, access_token: access_token },
    });
  };

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: id,
    });
  }, [id, singlePost]);

  return (
    <div>
      <div>
        <Header />
        {/*<a*/}
        {/*  onClick={onRemove}*/}
        {/*  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#6A64F1] rounded-lg hover:bg-[#5f57ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
        {/*>*/}
        {/*  ??????*/}
        {/*  <svg*/}
        {/*    aria-hidden="true"*/}
        {/*    className="ml-2 -mr-1 w-4 h-4"*/}
        {/*    fill="currentColor"*/}
        {/*    viewBox="0 0 20 20"*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*  ></svg>*/}
        {/*</a>*/}

        <div className=" items-center justify-center p-12">
          <div class="flex justify-between items-center ">
            <button
              type="button"
              value="??????"
              class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-[#FFD15C] text-white hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
            >
              ??????
            </button>
            <div className=" text-[#555555] title-font font-light mb-1">
              2020-10-17 22:48:00
              {/* {singlePost.updated_at.split("T")[0]}{" "}
                  {singlePost.updated_at.split("T")[1].split(".")[0]} */}
            </div>
          </div>

          <div class="mt-7">
            <label
              for="message"
              className="mb-5 font-custom text-[25px] block text-base font-medium text-[#07074D]"
            >
              ?????? ???????????? ?????? ???????????????
            </label>
            <p
              rows="9"
              id="message"
              class="w-full h-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#42DDBB] "
            >
              ???????????? ????????? ??? ????????????
            </p>
          </div>
          <div className=" mt-10">
            <div className="">{/* <p>{singlePost.content}</p> */}</div>

            <CommentForm post_id={id} />
            {/* {singlePost.comments.map((c) => {
              return <Comment key={c.id} comments={c} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
