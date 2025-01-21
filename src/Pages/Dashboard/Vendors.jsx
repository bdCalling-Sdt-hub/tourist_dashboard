import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import Search from "../../Components/Shared/Search";
import VendorsTable from "../../Components/VendorRequest/VendorsTable";
import { useGetVendorsQuery } from "../../Redux/Apis/vendorApis";
import { Select } from "antd";

const Vendors = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isFetching } = useGetVendorsQuery({
    page,
    searchTerm,
    status: filter,
  });
  const searchHandler = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      <div className="between-center gap-2">
        <PageHeading text={`Vendors Management`} />
        <div className="flex justify-end items-center gap-2">
          <Select
            onChange={(value) => setFilter(value === "All" ? "" : value)}
            placeholder="Filter "
            className="-mt-5"
            style={{
              width: "200px",
              height: "42px",
            }}
            options={[
              {
                label: "All",
                value: "All",
              },
              {
                label: "Deactivate",
                value: "deactivate",
              },
              {
                label: "Activate",
                value: "approved",
              },
            ]}
          />
          <Search handler={searchHandler} />
        </div>
      </div>
      <div className="bg-[var(--color-white)] rounded-md p-2 mt-3">
        <VendorsTable
          loading={(isLoading || isFetching) && true}
          setPage={setPage}
          meta={data?.data?.meta}
          data={data?.data?.result || []}
        />
      </div>
    </>
  );
};

export default Vendors;
