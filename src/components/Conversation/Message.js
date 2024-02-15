import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { DocMSG, LinkMSG, MediaMSG, ReplyMSG, TextMSG, Timeline } from './MsgTypes'

const Message = () => {
  return (
    <Box p = {3}>
<Stack spacing={3}>
    {Chat_History.map((el) => {
        switch(el.type){
            case "divider":
                return <Timeline el={el}/>
            case "msg":
                switch(el.subtype){
                    case "img":
                        //img msg
                        return <MediaMSG el = {el}/>
                    case "doc":
                        return <DocMSG el={el}/>
                    case "link":
                        return <LinkMSG el={el}/>
                    case "reply":
                        return <ReplyMSG el={el}/>
                    default:
                        //text
                        return <TextMSG el={el}/>
                }
            default:
                return <></>
        }
    })}
</Stack>
    </Box>
  )
}

export default Message
