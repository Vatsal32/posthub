import React, {FunctionComponent, useEffect, useState} from 'react';
import {Grid, List, ListItem, Typography, useTheme} from "@mui/material";
import Post from "./Post";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Insert from "./Insert";
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

interface OwnProps {
}

type Props = OwnProps;

let posts: Array<Posts> = [{
    _id: 1,
    user: {
        first: "Brad",
        last: "Gibson",
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        username: 'silverswan131'
    },
    content: 'Ultrices tincidunt arcu non sodales neque. Risus nec feugiat in fermentum posuere urna. Vel quam elementum pulvinar etiam non quam. Amet dictum sit amet justo donec enim. Purus faucibus ornare suspendisse sed. Ullamcorper velit sed ullamcorper morbi tincidunt. Eget mi proin sed libero. Dui id ornare arcu odio ut sem nulla pharetra diam. Pellentesque habitant morbi tristique senectus. Sapien nec sagittis aliquam malesuada bibendum arcu. Curabitur vitae nunc sed velit dignissim sodales ut. Leo duis ut diam quam nulla porttitor massa id neque. Non blandit massa enim nec dui nunc. Vel eros donec ac odio tempor orci. Volutpat diam ut venenatis tellus. Lacus viverra vitae congue eu consequat ac felis. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Feugiat in fermentum posuere urna nec. Blandit massa enim nec dui nunc mattis. Vitae aliquet nec ullamcorper sit amet risus nullam.',
    up: 10,
    down: 0,
    comments: [
        {
            _id: 1,
            post_id: 1,
            user: {
                first: "Brad",
                last: "Gibson",
                img: 'https://randomuser.me/api/portraits/men/75.jpg',
                username: 'silverswan131'
            },
            content: 'Ultrices tincidunt arcu non sodales neque. Risus nec feugiat in fermentum posuere urna.',
            up: 10,
            down: 1,
            liked: false,
        },
        {
            _id: 0,
            post_id: 1,
            user: {
                first: "Joanne",
                last: "Morrison",
                img: "https://randomuser.me/api/portraits/women/81.jpg",
                username: "bigkoala780"
            },
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
            up: 10,
            down: 1,
            liked: false,
        }
    ],
    liked: true,
}, {
    _id: 0,
    user: {
        first: "Joanne",
        last: "Morrison",
        img: "https://randomuser.me/api/portraits/women/81.jpg",
        username: "bigkoala780"
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    up: 50,
    down: 10,
    comments: [],
    liked: null,
}];

const myAni = keyframes`
    0% { display: none; opacity: 0; },
    1% { display: block; opacity: 0},
    100% { display: block; opacity: 1;}
`;

const MyListItem = styled((props: React.PropsWithChildren<any>) => <ListItem {...props}>{props.children}</ListItem>)<Posts>`
  animation: ${myAni} 2s ease;
  animation-delay: ${props => props._id}s;
  animation-fill-mode: forwards;
`;

const Home: FunctionComponent<Props> = (props) => {

    const [data, setData] = useState<JSX.Element[]>([]);

    const theme = useTheme();

    useEffect(() => {
        let data = localStorage.getItem("post");

        if (data !== null) {
            posts = JSON.parse(data);
        } else {
            localStorage.setItem('post', JSON.stringify(posts));
        }

        let p: JSX.Element[] = posts.map((item: Posts, index) => {
            return (
                <MyListItem key={index} sx={{
                    mb: 5,
                    borderBottom: 1,
                    borderColor: 'divider',
                    boxShadow: theme.palette.mode === 'light' ? 'rgba(14, 30, 37, 0.22) 0px 0px 8px 8px' : 'rgba(74, 63, 70, 0.22) 0px 0px 8px 8px',
                    bgcolor: theme.palette.background.default,
                    borderRadius: '25px',
                    opacity: 0,
                }} _id={index * 0.25}>
                    <Post key={item._id} {...item} />
                </MyListItem>
            );
        });

        setData(p);
    }, [theme.palette.background.default, theme.palette.mode]);

    return (
        <Grid p={2} sx={{bgcolor: 'rgba(255, 255, 255, 0.12)', minHeight: '91.75vh'}}>
            <List sx={{width: {xs: '100%', md: '75%', lg: '50%'}, margin: 'auto', height: '100%'}}>
                <Insert len={data.length} setPosts={setData} post_id={-1} makeVisible={undefined}>
                    <AddCircleOutlineIcon/>
                    <Typography sx={{m: 0.5}}>
                        &ensp;Add Post
                    </Typography>
                </Insert>
                {
                    data
                }
            </List>
        </Grid>
    );
};

export default Home;
