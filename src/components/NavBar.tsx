import * as React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Container} from '@mui/material';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {Theme} from "@mui/material";

interface OwnProps {
    colorMode: { toggleColorMode: () => void };
    theme: Theme;
}

type Props = OwnProps;

const ResponsiveAppBar = (props: Props) => {
    return (
        <AppBar position="static" sx={{bgcolor: props.theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : undefined}}>
            <Container maxWidth="xl" sx={{p: 1}}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href={'#'}
                        color={'inherit'}
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}, textDecoration: 'none', flexGrow: 1}}
                    >
                        PostHub
                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={'#'}
                        color={'inherit'}
                        sx={{
                            flexGrow: 1,
                            display: {xs: 'flex', md: 'none'},
                            textDecoration: 'none',
                            justifyContent: 'center'
                        }}
                    >
                        PostHub
                    </Typography>

                    <IconButton sx={{ml: 1, flexGrow: 0}} onClick={props.colorMode.toggleColorMode} color="inherit">
                        {props.theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
