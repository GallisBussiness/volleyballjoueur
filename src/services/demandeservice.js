import Api from "./api";

export const createDemande = (data) => Api.post('/demande', data).then(res => res.data);
export const AcceptDemande = (id,data) => Api.post('/demande/accept/' + id , data).then(res => res.data);
export const getDemandes = () => Api.get('/demande').then(res => res.data);
export const getDemandesByJoueur = (id) => Api.get('/demande/joueur/' + id ).then(res => res.data);
export const updateDemande = (id,data) => Api.patch('/demande/' + id, data).then(res => res.data);
export const removeDemande = (id) => Api.delete('/demande/'+id).then(res => res.data);