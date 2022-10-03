
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import SendIcon from "@mui/icons-material/Send";
import FireTruckIcon from '@mui/icons-material/FireTruck';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';


export function MovingIcon({number}){
  const lines = [];
  for (let i = 0; i < number; i++){
    lines.push(<HorizontalRuleIcon />);
  }

  return(
    <>
    {number === 10 ? (<><FireTruckIcon /><FireExtinguisherIcon /><LocalFireDepartmentIcon /></> ) : (<>{lines}
    <SendIcon /></>)}
    
    </>
    
  );
}