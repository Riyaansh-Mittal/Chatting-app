import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { DocMSG, LinkMSG, MediaMSG, ReplyMSG, TextMSG, Timeline } from './MsgTypes'

const Message = ({menu}) => {
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
                        return <MediaMSG el = {el} menu={menu}/>
                    case "doc":
                        return <DocMSG el={el} menu={menu}/>
                    case "link":
                        return <LinkMSG el={el} menu={menu}/>
                    case "reply":
                        return <ReplyMSG el={el} menu={menu}/>
                    default:
                        //text
                        return <TextMSG el={el} menu={menu}/>
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
