import { LoadingOverlay } from "@mantine/core";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import {  getEquipeByJoueur } from "../services/equipe-service";
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { useState } from "react";

function Equipes() {
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const auth = useAuthUser()();
    const qk = ['get_Equipes',auth?.id]
    const {data: Equipes, isLoading} = useQuery(qk, () => getEquipeByJoueur(auth?.id))
    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Mes Equipes</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const header = renderHeader();

    const CoequipierTemplate = (row) => `${row?.idCoequipier?.prenom ?? 'inconnue'} ${row?.idCoequipier?.nom ?? 'inconnue'}` ;

    const CapitaineTemplate = (row) => `${row?.idCapitaine?.prenom ?? 'inconnue'} ${row?.idCapitaine?.nom ?? 'inconnue'}` ;

    const activationTemplate = (row) => {
        return row.isValidate ? 'valide'  : 'en cours de validation';
      }

 return (
  <>
  <LoadingOverlay visible={isLoading} overlayBlur={2} />
  <div className="flex flex-wrap bg-whity">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl  bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                  <div className="flex items-center justify-start h-full">
                    <h5 className="font-bold text-3xl">Mes Equipes</h5>
                  </div>
                </div>
                <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
                  <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
                    <div className="relative flex items-center justify-center h-full">
                             
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="datatable-doc mt-4 mx-10">
                  <div className="card">
                      <DataTable value={Equipes} paginator  header={header} rows={10}
                          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                          dataKey="_id" rowHover
                          filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                          globalFilterFields={['nom', 'prenom']}
                          currentPageReportTemplate="Voir {first} de {last} ?? {totalRecords} Equipes">
                          <Column field="nom" header="Nom" sortable style={{ minWidth: '14rem' }} />
                          <Column header="Coequipier" body={CoequipierTemplate} sortable style={{ minWidth: '14rem' }} />
                          <Column header="Capitaine" body={CapitaineTemplate} sortable style={{ minWidth: '14rem' }} />
                          <Column field="idTournoi.nom" header="Tournoi" sortable  style={{ minWidth: '14rem' }} />
                          <Column header="Acceptation" body={activationTemplate} style={{ minWidth: '14rem' }} />
                      </DataTable>
                  </div>
              </div>
  </>
 );
}

export default Equipes