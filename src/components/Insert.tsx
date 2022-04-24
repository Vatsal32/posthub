import React, {FunctionComponent, useState} from 'react';
import {
    Backdrop,
    Button,
    Fade,
    Grid,
    IconButton,
    ListItem,
    Modal,
    TextField, Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import Post from "./Post";
import Comment from "./Comment";

interface OwnProps {
    len: number;
    post_id: number;
    setPosts: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    makeVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

type Props = React.PropsWithChildren<OwnProps>;

const Insert: FunctionComponent<Props> = (props) => {

    const [cnt, setCnt] = useState("");

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setCnt("");
        setOpen(false);
    }

    const theme = useTheme();

    const insert = async () => {
        await fetch('https://randomuser.me/api/').then(res => res.json()).then((res) => {
            let newP: any = {
                user: {
                    first: res.results[0].name.first,
                    last: res.results[0].name.last,
                    img: res.results[0].picture.large,
                    username: res.results[0].login.username,
                },
                content: cnt,
                up: 0,
                down: 0,
                liked: null,
            };

            if (props.post_id === -1) {
                newP = {...newP, _id: props.len, comments: []} as Posts;
            } else {
                newP = {...newP, post_id: props.post_id, _id: props.len} as Comments;
            }

            let k: any = localStorage.getItem('post');

            if (k !== null) {
                k = JSON.parse(k) as Posts[];
            } else {
                k = [];
            }

            let n: JSX.Element;

            if (props.post_id === -1) {
                k = [newP, ...k];
                n = (
                    <ListItem key={props.len} sx={{
                        mb: 5,
                        borderBottom: 1,
                        borderColor: 'divider',
                        boxShadow: theme.palette.mode === 'light' ? 'rgba(14, 30, 37, 0.22) 0px 0px 8px 8px' : 'rgba(74, 63, 70, 0.22) 0px 0px 8px 8px',
                        bgcolor: theme.palette.background.default,
                        borderRadius: '25px',
                    }}>
                        <Post key={props.len} {...newP as Posts} />
                    </ListItem>
                );
            } else {
                let tmp = k[k.length - props.post_id - 1].comments;
                console.log(tmp);
                newP = {...newP, _id: tmp.length};
                k[k.length - props.post_id - 1].comments = [newP, ...tmp];
                n = (
                    <ListItem key={props.len} sx={{
                        pl: 7,
                        bgcolor: theme.palette.background.default,
                    }}>
                        <Comment key={props.len} {...newP as Comments} />
                    </ListItem>
                );

            }

            localStorage.setItem('post', JSON.stringify(k));

            props.setPosts(prev => {
                return [n, ...prev];
            });

            if (props.makeVisible !== undefined) {
                props.makeVisible(true);
            }

            handleClose();
        });
    };

    return (
        <Grid sx={{
            width: props.post_id === -1 ? '100%' : 'auto',
            justifyContent: 'center',
            display: 'flex',
            p: props.post_id === -1 ? 3 : 0
        }}>
            <Tooltip title={"Add a " + (props.post_id === -1 ? 'Post' : 'Comment')}>
                {
                    props.post_id === -1 ? <Button variant={'contained'} onClick={handleOpen}>
                            {props.children}
                        </Button> :
                        <IconButton onClick={handleOpen}>
                            {props.children}
                        </IconButton>
                }
            </Tooltip>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{
                    height: '100%',
                }}
            >
                <Fade in={open}>
                    <Grid sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {xs: '90%', md: '75%', lg: '40%'},
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        boxShadow: 24,
                        borderRadius: '5px',
                        p: 4,
                        m: 'auto',
                    }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Enter the {props.post_id === -1 ? 'Post' : 'Comment'}
                        </Typography>
                        <TextField rows={10} fullWidth multiline value={cnt} sx={{
                            my: 3
                        }} onChange={(e) => setCnt(e.target.value)}/>
                        <Grid sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant={"contained"} color={'success'} sx={{mx: 3}} onClick={insert}>
                                {props.post_id === -1 ? 'Post' : 'Comment'}
                            </Button>
                            <Button variant={"outlined"} color={'error'} onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </Grid>
    );
};

export default Insert;
