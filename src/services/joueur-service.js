import Api from "./api";

export const loginjour = (data) => Api.post('/user/loginjoueur', data).then(res => res.data.data);
export const createJoueur = (data) => Api.post('/user/joueurs/create', data).then(res => res.data.data);
export const getJoueurs = () => Api.get('/user/joueurs/getall').then(res => res.data);
export const updateJoueur = (id,data) => Api.patch('/user/joueurs/update/' + id, data).then(res => res.data);
export const removeJoueur = (id) => Api.delete('/user/joueurs/delete/'+id).then(res => res.data);