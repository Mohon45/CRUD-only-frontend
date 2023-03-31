import React, { useState } from "react";
import { Modal } from "../../shared/component/Modal";
import Loader from "../../shared/component/Loader";

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState("");
  const [updateIndicator, setUpdateIndicator] = useState("");
  const [promoCodes, setPromoCodes] = useState([
    { promoCode: "thinkystorm20", discount: 20 },
  ]);
  const [loading, setLoading] = useState(false);

  let updateItem = {};
  if (updateIndicator) {
    updateItem = promoCodes.find((item) => item.promoCode === updateIndicator);
  }

  const onsubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const newPromo = {
      promoCode: promo,
      discount: discount,
    };
    setTimeout(() => {
      promoCodes.push(newPromo);
      setLoading(false);
    }, 1000);
  };

  const onUpdateHandler = (e, indecator) => {
    e.preventDefault();
    let updatedObj = { promoCode: promo, discount: discount };
    const index = promoCodes.findIndex((item) => item.promoCode === indecator);
    let newPromoCodes = [...promoCodes];
    newPromoCodes[index] = updatedObj;
    setPromoCodes(newPromoCodes);
    setModal(false);
  };

  const onDeleteHandler = (indecator) => {
    setPromoCodes(promoCodes.filter((item) => item.promoCode !== indecator));
  };

  const onApplyHandler = (e) => {
    e.preventDefault();
    const result = promoCodes.find((item) => item.promoCode === promo);

    if (promo === result?.promoCode) {
      alert("You have a " + result.discount + "% discount");
    } else {
      alert("your Entered promoCode is not a valid PromoCode");
    }
  };

  return (
    <Loader active={loading}>
      <div className="w-[80%] mx-auto my-10 border-2 border-green-500 p-6 rounded-lg">
        <div className="">
          <form onSubmit={onsubmitHandler}>
            <p className="my-4">
              Enter a details on this form and create a new promo code
            </p>
            <div className="flex">
              <div>
                <label htmlFor="promocode" className="text-lg font-bold mr-2">
                  PromoCode
                </label>
                <input
                  type="text"
                  to="promocode"
                  onChange={(e) => {
                    setPromo(e.target.value);
                  }}
                  className="border border-green-500 focus:border-2 focus:border-green-700-600 outline-none focus:outline-none rounded-md px-2 py-2"
                  placeholder="enter your promoCode name"
                />
              </div>
              <div className="mx-4">
                <label htmlFor="discount" className="text-lg font-bold mr-2">
                  Discount
                </label>
                <input
                  type="text"
                  to="discount"
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                  className="border border-green-500 focus:border-2 focus:border-green-700-600 outline-none focus:outline-none rounded-md px-2 py-2"
                  placeholder="enter your discount"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <hr className="my-6 border border-bottom-2 border-green-500" />

        <table className="w-[100%]">
          <thead>
            <tr>
              <th className="border border-green-500 py-2">SL</th>
              <th className="border border-green-500 py-2">promoCode</th>
              <th className="border border-green-500 py-2">discount</th>
              <th className="border border-green-500 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((item, index) => (
              <tr className="text-center" key={index}>
                <td className="border border-green-500 py-2">{index + 1}</td>
                <td className="border border-green-500 py-2">
                  {item.promoCode}
                </td>
                <td className="border border-green-500 py-2">
                  {item.discount}
                </td>
                <td className="border border-green-500 py-2">
                  <button
                    onClick={(e) => {
                      setModal(true);
                      setUpdateIndicator(item.promoCode);
                    }}
                    className="bg-green-500 px-4 py-1 text-white rounded-md mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDeleteHandler(item.promoCode);
                    }}
                    className="bg-red-500 px-4 py-1 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8">
          <p>you have apply any Promocode</p>
          <form
            className="flex mt-2"
            onSubmit={(e) => {
              onApplyHandler(e);
            }}
          >
            <div>
              <label htmlFor="discount" className="text-lg font-bold mr-4">
                Apply PromoCode
              </label>
              <input
                type="text"
                to="discount"
                onChange={(e) => setPromo(e.target.value)}
                className="border border-green-500 focus:border-2 focus:border-green-700-600 outline-none focus:outline-none rounded-md px-2 py-2"
                placeholder="enter your discount"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 rounded-lg ml-4"
            >
              Apply
            </button>
          </form>
        </div>

        {/* modal here */}
        {modal && (
          <Modal
            title={"update the promo code"}
            subtitle={
              "Please enter the following information to update your promocode"
            }
            setModal={setModal}
            body={
              <div>
                <form
                  onSubmit={(e) => {
                    onUpdateHandler(e, updateIndicator);
                  }}
                >
                  <div className="flex items-end">
                    <div>
                      <label
                        htmlFor="promocode"
                        className="text-lg font-bold mr-2"
                      >
                        PromoCode
                      </label>
                      <input
                        type="text"
                        to="promocode"
                        placeholder={updateItem?.promoCode}
                        onChange={(e) => {
                          setPromo(e.target.value);
                        }}
                        className="border border-green-500 focus:border-2 focus:border-green-700-600 outline-none focus:outline-none rounded-md px-2 py-2 mt-2"
                      />
                    </div>
                    <div className="mx-4">
                      <label
                        htmlFor="discount"
                        className="text-lg font-bold mr-2"
                      >
                        Discount
                      </label>
                      <input
                        type="text"
                        to="discount"
                        placeholder={updateItem?.discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                        className="border border-green-500 focus:border-2 focus:border-green-700-600 outline-none focus:outline-none rounded-md px-2 py-2 mt-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 text-white h-[50px] px-6 rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            }
          />
        )}
      </div>
    </Loader>
  );
};

export default Dashboard;
