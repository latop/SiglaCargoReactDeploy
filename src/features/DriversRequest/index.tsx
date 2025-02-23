"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import Modal from "@/components/Modal";
import { useDriverReleaseMutation } from "@/services/mutation/drivers";
import {
  DriverReleaseFilterPayload,
  DriverRequestResponse,
  useDriverRequestQuery,
} from "@/services/query/drivers";
import { Box } from "@mui/material";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import DriverReleaseFilters from "./components/drivers-release-filters";
import DriverReleaseGrid from "./components/drivers-release-grid";

const DriversRequestTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: "", status: "" });
  const [filters, setFilters] = useState<
    DriverReleaseFilterPayload | undefined
  >();

  const { mutateAsync, isPending } = useDriverReleaseMutation();
  const { data, isLoading: isLoadingQuery } = useDriverRequestQuery(filters);

  const openModal = async (id: string, status: string) => {
    console.log("id", id);
    console.log("status", status);

    setModalData({ id, status });
    setIsOpen(true);
  };

  const handleModalSave = async () => {
    await mutateAsync({
      driverRequestId: modalData.id,
      flgStatus: modalData.status,
    });
    setIsOpen(false);
    handleApplyFilter(filters as DriverReleaseFilterPayload);
  };

  const isLoading = isPending || isLoadingQuery;

  console.log(data);
  console.log(isLoading);
  const handleApplyFilter = (values: DriverReleaseFilterPayload) => {
    setFilters(values);
    console.log("handleApplyFilter", values);
  };

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Solicitação de Motoristas</HeaderTitle>
      </AppBar>
      {JSON.stringify(filters)}
      <Box padding={"20px"}>
        <DriverReleaseFilters onApplySearch={handleApplyFilter} />
        <DriverReleaseGrid
          data={(data || []) as DriverRequestResponse[]}
          handleChangeStatus={openModal}
        />
      </Box>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSave={handleModalSave}
        isLoading={isLoading}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <CiWarning color="#c49507" size={48} />
            <h2>Atenção!</h2>
          </Box>
          <p>
            Deseja realmente
            {modalData.status === "A" ? " aprovar" : " negar"} esse registro?
          </p>
        </Box>
      </Modal>
    </MainContainer>
  );
};

export default DriversRequestTemplate;
