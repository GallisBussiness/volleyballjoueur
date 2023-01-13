import { Divider, Group, Paper, RingProgress, Text } from '@mantine/core'
import React from 'react'
import { FaVolleyballBall } from 'react-icons/fa'

function Score({tournoi,equipeA,equipeB,scoreA,scoreB,date,heure,lieu}) {
  return (
    <>
     <Paper shadow="sm" p="md" className="w-1/2 mx-auto my-2">
     <div className="flex items-center justify-center py-2">
     <Text className="font-bold">{tournoi}</Text>
     </div>
     <Divider />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
        <Group position="center">
        <RingProgress
        size={170}
        thickness={16}
        label={
         <FaVolleyballBall className="w-24 h-24 text-orange-500 mx-auto" />
        }
        sections={[{ value: 0, color: 'grey' }]}
      />
     </Group>
      <div className="my-2"> {equipeA}</div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
         <div className="font-bold text-sm">{date} / {heure}</div>
         <div className="text-4xl font-bold">{scoreA} : {scoreB}</div>
         <div className="font-bold text-lg">{lieu}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
        <Group position="center">
        <RingProgress
        size={170}
        thickness={16}
        label={
         <FaVolleyballBall className="w-24 h-24 text-orange-500 mx-auto" />
        }
        sections={[{ value: 0, color: 'grey'}]}
      />
     </Group>
      <div className="my-2"> {equipeB}</div>
        </div>
      </div>
    </Paper>
    </>
  )
}

export default Score