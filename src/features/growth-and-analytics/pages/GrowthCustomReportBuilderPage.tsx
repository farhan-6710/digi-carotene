import { CustomReportBuilderForm } from "../components/CustomReportBuilderForm";
import { useCustomReportBuilder } from "../hooks/useCustomReportBuilder";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";

export function GrowthCustomReportBuilderPage() {
  const { values, toggleAccount, toggleMetric, changeField, generate } =
    useCustomReportBuilder();

  return (
    <PageContent>
      <PageHeader
        heading="Custom Report Builder"
        description="Assemble a tailored report by selecting accounts, metrics, date range, and export format."
      />

      <CustomReportBuilderForm
        values={values}
        onToggleAccount={toggleAccount}
        onToggleMetric={toggleMetric}
        onFieldChange={changeField}
        onGenerate={generate}
      />
    </PageContent>
  );
}
