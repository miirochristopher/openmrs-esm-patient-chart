import React, { useMemo } from "react";
import WorkspaceWrapper from "../workspace/workspace-wrapper.component";
import ChartReview from "./chart-review.component";
import styles from "./patient-chart.component.scss";
import VisitDialog from "../visit/visit-dialog.component";
import Loader from "./loader.component";
import { RouteComponentProps } from "react-router-dom";
import { ExtensionSlot, useCurrentPatient } from "@openmrs/esm-framework";

interface PatientChartParams {
  patientUuid: string;
  view: string;
  subview: string;
}

const PatientChart: React.FC<RouteComponentProps<PatientChartParams>> = ({
  match
}) => {
  const { patientUuid, view, subview } = match.params;
  const [loading, patient] = useCurrentPatient(patientUuid);
  const state = useMemo(() => {
    return { patient, patientUuid };
  }, [patient, patientUuid]);

  return (
    <main
      className="omrs-main-content"
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column"
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <ExtensionSlot extensionSlotName="breadcrumbs-slot" />
          <aside className={styles.patientBanner}>
            <ExtensionSlot
              extensionSlotName="patient-header-slot"
              state={state}
            />
            <ExtensionSlot
              extensionSlotName="patient-info-slot"
              state={state}
            />
          </aside>
          <div className={styles.grid}>
            <div className={styles.chartreview}>
              <ChartReview {...state} view={view} subview={subview} />
              <VisitDialog />
            </div>
            <div className={styles.workspace}>
              <WorkspaceWrapper />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default PatientChart;
