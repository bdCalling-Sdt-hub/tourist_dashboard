import React, { useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import UserImageName from "../Shared/UserImageName";
import { useDeclineRequestMutation } from "../../Redux/Apis/vendorApis";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const VendorsTable = ({ data, meta, setPage, loading }) => {
  const [activeDeActive] = useDeclineRequestMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Toggle status and open modal for deactivation
  const toggleStatus = (record) => {
    if (record?.status === "deactivate") {
      activeDeActive({
        id: record._id,
        reasons: "",
        status: "approved",
      })
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Vendor deactivated");
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Something went wrong");
        });
    } else {
      setSelectedVendor(record);
      setIsModalVisible(true);
    }
  };

  // Handle modal OK (submit deactivation reason)
  const handleModalOk = () => {
    if (!deactivationReason.trim()) {
      toast.error("Please provide a reason for deactivation");
      return;
    }

    activeDeActive({
      id: selectedVendor._id,
      reasons: deactivationReason,
      status: "deactivate",
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Vendor deactivated");
        setIsModalVisible(false);
        setDeactivationReason("");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Something went wrong");
      });
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setDeactivationReason("");
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Link
          target="_blank"
          to={`https://dashboard.whatsupjaco.com/details/author?id=${record?._id}`}
          // to={`http://localhost:3000/details/author?id=${record?._id}`}
        >
          <UserImageName name={record?.name} image={record?.business_profile} />
        </Link>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active/Deactivate Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => <span>{record?.updatedAt?.split("T")?.[0]}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Button
            style={{
              width: "110px",
            }}
            type="text"
            className={`${
              record.status === "approved"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            } px-3 py-1 rounded-md`}
            onClick={() => toggleStatus(record)}
          >
            {record.status === "approved" ? "Activate" : "Deactivate"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <Table
        loading={loading}
        dataSource={data || []}
        columns={columns}
        pagination={{
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: (page) => setPage(page),
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`,
          position: ["bottomCenter"],
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return <a>Previous</a>;
            }
            if (type === "next") {
              return <a>Next</a>;
            }
            return originalElement;
          },
        }}
      />

      {/* Modal for deactivation reason */}
      <Modal
        title="Deactivation Reason"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Deactivate"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item
            label="Reason for Deactivation"
            name="reason"
            rules={[
              {
                required: true,
                message: "Please provide a reason for deactivation!",
              },
            ]}
          >
            <Input.TextArea
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsTable;
