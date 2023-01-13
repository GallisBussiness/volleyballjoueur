import { Alert } from '@mantine/core';
import { FiAlertTriangle } from 'react-icons/fi';

export function Notactive() {
  return (
    <Alert icon={<FiAlertTriangle size={16} />} title="compte pas active" color="yellow">
      Votre compte sera actif aprés la verification des administrateurs !
    </Alert>
  );
}