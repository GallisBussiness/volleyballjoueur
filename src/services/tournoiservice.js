import Api from "./api";

export const createTournoi = (data) => Api.post('/tournoi', data).then(res => res.data);
export const getTournois = () => Api.get('/tournoi').then(res => res.data);
export const getTournoisByJoueur = (id) => Api.get('/tournoi/user/' + id ).then(res => res.data);
export const updateTournoi = (id,data) => Api.patch('/tournoi/' + id, data).then(res => res.data);
export const removeTournoi = (id) => Api.delete('/tournoi/'+id).then(res => res.data);