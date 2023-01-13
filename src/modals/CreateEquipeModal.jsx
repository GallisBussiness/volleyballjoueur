import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Button, Select, TextInput } from '@mantine/core';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getTournois } from '../services/tournoiservice';
import { getJoueurs } from '../services/joueur-service';

const schema = yup.object({
    idTournoi: yup.string()
    .required(),
    nom: yup.string()
    .required(),
    idCapitaine: yup.string()
    .required(),
    idCoequipier: yup.string()
    .required(),
  }).required();


const CreateEquipeModal = ({ isOpen, onResolve, onReject,idTournoi, idCapitaine }) => {
  const [coequipiers, setCoequipiers] = useState([]);

  const qkc = ['get_Joueurs']

  useQuery(qkc, () => getJoueurs(), {
    onSuccess: (_) => {
      const t = _.filter(j => j.isActive).map(ty => ({label: `${ty.prenom} ${ty.nom} ${ty.licence}`, value: ty._id})).filter(u => u.value !== idCapitaine);
      setCoequipiers(t)
    }
  });


    const defaultValues = {nom: '', idTournoi, idCapitaine, idCoequipier: ''};
      const {control, handleSubmit, formState: {errors} } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

    
    const onCreate = (data) => {
        onResolve(data);
      };

  return (
    <>
       <Dialog header="Creer un equipe" visible={isOpen} onHide={() => onReject()} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
             <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
                <TextInput value={field.value} onChange={field.onChange}
                 label="Nom de l'equipe" error={errors.nom && errors.nom.message}
                 placeholder="nom de l'équipe"
                   withAsterisk/>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="idCoequipier" render={({field}) => (
             <Select value={field.value} onChange={field.onChange} searchable placeholder="selectionnez votre Coequipier" label="Nom du Coequipier" data={coequipiers} withAsterisk/>
             )}/>
            </div>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700"> S'INSCRIRE AU TOURNOI</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateEquipeModal);