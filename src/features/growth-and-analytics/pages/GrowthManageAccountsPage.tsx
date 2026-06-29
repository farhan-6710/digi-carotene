import { AdAccountDialog } from "../components/accounts/AdAccountDialog";
import { AdAccountsList } from "../components/accounts/AdAccountsList";
import { OrganicAccountDialog } from "../components/accounts/OrganicAccountDialog";
import { OrganicAccountsList } from "../components/accounts/OrganicAccountsList";
import { useManageAccounts } from "../hooks/useManageAccounts";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";

export function GrowthManageAccountsPage() {
  const {
    organic,
    ads,
    organicDialog,
    adDialog,
    openOrganicCreate,
    openOrganicEdit,
    openAdCreate,
    openAdEdit,
  } = useManageAccounts();

  return (
    <PageContent>
      <PageHeader
        heading="Manage Accounts"
        description="Connect and manage the organic profiles and ad accounts used across reports."
      />

      <OrganicAccountsList
        accounts={organic}
        onAdd={openOrganicCreate}
        onEdit={openOrganicEdit}
      />

      <AdAccountsList accounts={ads} onAdd={openAdCreate} onEdit={openAdEdit} />

      <OrganicAccountDialog {...organicDialog} />
      <AdAccountDialog {...adDialog} />
    </PageContent>
  );
}
