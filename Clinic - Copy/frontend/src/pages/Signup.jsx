import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/create",
        data,
      );
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            {...register("a_name", { required: "Name is required" })}
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.a_name && <p className="text-red-500">{errors.a_name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Phone Number</label>
          <input
            {...register("a_phnno", { required: "Phone number is required" })}
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.a_phnno && <p className="text-red-500">{errors.a_phnno.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
