import React from "react";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils/countries";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCooies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCooies(),
  });

  const onAddressForm = (data: FormData) => {
    Cookies.set("firstName", data.firstName);
    Cookies.set("lastName", data.lastName);
    Cookies.set("address", data.address);
    Cookies.set("address2", data.address2 || "");
    Cookies.set("zip", data.zip);
    Cookies.set("city", data.city);
    Cookies.set("country", data.country);
    Cookies.set("phone", data.phone);
    router.push("/checkout/summary");
  };
  return (
    <ShopLayout title="Address" pageDescription="Confirm Address">
      <form onSubmit={handleSubmit(onAddressForm)} noValidate>
        <h1 className="text-3xl font-bold">Address</h1>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className={!!errors.firstName ? "input-error" : "input"}
              {...register("firstName", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">
              {errors.firstName?.message}
            </p>
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              className={!!errors.lastName ? "input-error" : "input"}
              {...register("lastName", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">
              {errors.lastName?.message}
            </p>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              className={!!errors.address ? "input-error" : "input"}
              {...register("address", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">
              {errors.address?.message}
            </p>
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input
              id="address2"
              type="text"
              placeholder="Address 2"
              className={!!errors.address2 ? "input-error" : "input"}
              {...register("address2")}
            />
          </div>
          <div>
            <label htmlFor="cp">CP</label>
            <input
              id="cp"
              type="text"
              placeholder="CP"
              className={!!errors.zip ? "input-error" : "input"}
              {...register("zip", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">{errors.zip?.message}</p>
          </div>
          <div>
            <label htmlFor="pais">Pais</label>
            <select
              id="pais"
              className={!!errors.country ? "input-error" : "input"}
              {...register("country", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className="px-4 text-sm text-red-500">
              {errors.country?.message}
            </p>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="City"
              className={!!errors.city ? "input-error" : "input"}
              {...register("city", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">{errors.city?.message}</p>
          </div>
          <div>
            <label htmlFor="tel">Tel. Number</label>
            <input
              id="tel"
              type="text"
              placeholder="Tel. Number"
              className={!!errors.phone ? "input-error" : "input"}
              {...register("phone", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Should be have at least 2 characters",
                },
              })}
            />
            <p className="px-4 text-sm text-red-500">{errors.phone?.message}</p>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="circular-btn bg-[#325AD0] px-10 py-2 text-white"
          >
            Place Order
          </button>
        </div>
      </form>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies as { token: string };
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
