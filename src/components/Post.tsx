import React, {FunctionComponent, useEffect, useState} from 'react';
import {Avatar, Button, Grid, List, ListItem, Tooltip, Typography, useTheme} from "@mui/material";
import Comment from "./Comment";
import LikeDislike from "./LikeDislike";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Insert from "./Insert";

type Props = Posts;

const Post: FunctionComponent<Props> = (props) => {

    const [user,] = useState<Users>(props.user);

    const [content,] = useState<string>(props.content);

    const [comments, setComments] = useState<Array<JSX.Element>>([]);

    const [hidden, setHidden] = useState<boolean>(false);

    const theme = useTheme();

    useEffect(() => {
        let k: any = localStorage.getItem('post');
        if (k !== null) {
            k = JSON.parse(k) as Posts[];
            let com: Comments[] = k[k.length - props._id - 1].comments;

            let p: JSX.Element[] = com.map((item, index) => {
                return (
                    <ListItem key={index} sx={{
                        pl: 7,
                        bgcolor: theme.palette.background.default,
                    }}>
                        <Comment key={item._id} {...item} />
                    </ListItem>
                );
            });

            setComments(p);
        }
    }, [props._id, theme.palette.background.default]);

    return (
        <Grid sx={{width: '100%', px: 3, py: 3}} maxWidth={'l'}>
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

            <Grid sx={{
                m: 1,
                ml: 7,
                borderBottom: 1,
                borderColor: 'divider',
                pb: 1,
                display: 'flex',
                alignItems: 'center'
            }}>
                <LikeDislike liked={props.liked} likes={props.up} dislikes={props.down} post_id={props._id} _id={-1}/>
                <Tooltip title={"Hide or Show Comments"}>
                    <Button onClick={() => setHidden(prev => !prev)}>
                        <Typography variant={'body2'} fontSize={10}>
                            Comments
                        </Typography>
                    </Button>
                </Tooltip>
                <Insert len={comments.length} setPosts={setComments} post_id={props._id} makeVisible={setHidden}>
                    <AddCommentOutlinedIcon/>
                </Insert>
                <Typography variant={'body2'} color={theme.palette.text.disabled}>
                    {comments.length}
                </Typography>
            </Grid>

            <List sx={{height: hidden ? '' : 0, display: hidden ? 'block' : 'none'}}>
                {
                    comments
                }
            </List>
        </Grid>
    );
};

export default Post;
