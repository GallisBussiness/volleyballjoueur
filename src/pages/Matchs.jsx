import { LoadingOverlay } from "@mantine/core";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import {  getMatchByJoueur } from "../services/match-service";
import { format, parseISO } from "date-fns";
import Score from "../components/Score";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";

function Matchs() {

  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
    const qk = ['get_Matchs',auth?.id]
    const {data: Matchs, isLoading} = useQuery(qk, () => getMatchByJoueur(auth?.id))

    const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Mes Matches </h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
              </span>
          </div>
      )
  }

  const header = renderHeader();

    const dateTemplate = (row) => format(parseISO(row),'dd-MM-yyyy');
    const heureTemplate = (row) => row.slice(0, -1);

    const matchTemplate = (row) => <Score
    tournoi={row.tournoi.nom}
    equipeA={row.equipeA.nom}
    equipeB={row.equipeB.nom}
    scoreA={row.scoreA}
    scoreB={row.scoreB}
    lieu={row.lieu}
    date={dateTemplate(row.date)}
    heure={heureTemplate(row.heure)}
     />

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
                    <h5 className="font-bold text-3xl">Mes Matchs</h5>
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
                      <DataTable value={Matchs} paginator  rows={10}
                          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5,10,25]}
                          dataKey="_id" rowHover
                          filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                          globalFilterFields={['date', 'equipeA.nom','equipeB.nom']}
                          currentPageReportTemplate="Voir {first} de {last} à {totalRecords} matchs">
                          <Column body={matchTemplate} style={{ minWidth: '14rem' }} />
                          
                      </DataTable>
                  </div>
              </div>
      {/* {Matchs?.map((m,i) => <div key={i}><Score
       tournoi={m.tournoi.nom}
       equipeA={m.equipeA.nom}
       equipeB={m.equipeB.nom}
       scoreA={m.scoreA}
       scoreB={m.scoreB}
       lieu={m.lieu}
       date={dateTemplate(m.date)}
       heure={heureTemplate(m.heure)}
        /></div>)} */}
  </>
 );
}

export default Matchs