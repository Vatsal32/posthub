import React, {FunctionComponent, useEffect, useState} from 'react';
import {Grid, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

interface OwnProps {
    liked: boolean | null;
    likes: number;
    dislikes: number;
    post_id: number;
    _id: number;
}

type Props = OwnProps;

const LikeDislike: FunctionComponent<Props> = (props) => {

    const [like, setLike] = useState<boolean | null>(props.liked);

    const [likes, setLikes] = useState<number>(props.likes);

    const [dislikes, setDislikes] = useState<number>(props.dislikes);

    const [net, setNet] = useState<number>(0);

    useEffect(() => {
        let k: any = localStorage.getItem('post');

        if (k !== null) {
            k = JSON.parse(k) as Posts[];
            if (props._id === -1) {
                k[k.length - props.post_id - 1] = {
                    ...k[k.length - props.post_id - 1],
                    up: likes,
                    down: dislikes,
                    liked: like
                };
            } else {
                k[k.length - props.post_id - 1].comments[k[k.length - props.post_id - 1].comments.length - props._id - 1] = {
                    ...k[k.length - props.post_id - 1].comments[k[k.length - props.post_id - 1].comments.length - props._id - 1],
                    up: likes,
                    down: dislikes,
                    liked: like
                };
            }

            localStorage.setItem('post', JSON.stringify(k));
        }
        setNet(likes - dislikes);
    }, [likes, dislikes, props.post_id, props._id, like]);

    const theme = useTheme();

    return (
        <Grid sx={{display: 'flex', alignItems: 'center', mx: 1}}>
            <Tooltip title={"Up vote"}>
                <IconButton onClick={() => {
                    let val = like === true ? null : true;
                    setLikes(prev => (like === true ? prev - 1 : prev + 1));
                    setDislikes(prev => like === false ? prev - 1 : prev);
                    setLike(val);
                }}>
                    {like ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
                </IconButton>
            </Tooltip>

            <Tooltip title={"Down vote"}>
                <IconButton onClick={() => {
                    let val = like === false ? null : false;
                    setDislikes(prev => (like === false ? prev - 1 : prev + 1));
                    setLikes(prev => like ? prev - 1 : prev);
                    setLike(val);
                }}>
                    {like === false ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/>}
                </IconButton>
            </Tooltip>

            <Tooltip title={"Net votes"}>
                <Typography variant={'body1'}
                            color={like === null ? theme.palette.text.secondary : (net < 0 ? 'red' : 'green')}
                            sx={{mx: 1}}>
                    {net}
                </Typography>
            </Tooltip>
        </Grid>
    );
};

export default LikeDislike;
