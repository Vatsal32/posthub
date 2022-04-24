import React, {FunctionComponent, useState} from 'react';
import {Avatar, Grid, Typography, useTheme} from "@mui/material";
import LikeDislike from "./LikeDislike";

type Props = Comments;

const Comment: FunctionComponent<Props> = (props) => {

    const [user,] = useState<Users>(props.user);

    const [content,] = useState<string>(props.content);

    const theme = useTheme();

    return (
        <Grid sx={{width: '100%', p: 2, pb: 0.5}} maxWidth={'l'}>
            <Grid sx={{display: 'flex'}}>
                <Avatar src={user.img}/>
                <Grid sx={{mx: 2}}>
                    <Typography variant={'body1'}>
                        {user.first + ' ' + user.last}
                    </Typography>
                    <Typography variant={'body2'} color={theme.palette.text.disabled}>
                        @{user.username}
                    </Typography>
                </Grid>
            </Grid>

            <Typography sx={{m: 1, mx: 7, pb: 1, borderBottom: 1, borderColor: 'divider'}} variant={'body1'}
                        color={theme.palette.text.secondary}>
                {content}
            </Typography>

            <Grid sx={{m: 1, mx: 7, borderBottom: 1, borderColor: 'divider', pb: 1}}>
                <LikeDislike liked={props.liked} likes={props.up} dislikes={props.down} post_id={props.post_id} _id={props._id}/>
            </Grid>
        </Grid>
    );
};

export default Comment;
