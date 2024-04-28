import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';


const JoinMatchList = (props) => {
  const { arrayOfRooms, handleSelectMatch } = props;
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleRoomSelector = (room) => {
    setSelectedRoom(room);
    handleSelectMatch(room);
  };

  const RenderRow = ({ index, style }) => {
    const room = arrayOfRooms[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => handleRoomSelector(room)}>
          <ListItemText
            primary={room}
            sx={{
              backgroundColor: selectedRoom === room ? '#9caab7' : "",
              border: selectedRoom === room ? "1px solid white" : "1px solid white",
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: '#0000b' ,border:1,borderColor:'white',color:'white'}}>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={arrayOfRooms.length}
        overscanCount={5}
        itemData={{ arrayOfRooms }}

      >
        {RenderRow}
      </FixedSizeList>
    </Box>
  );
};

export default JoinMatchList;
