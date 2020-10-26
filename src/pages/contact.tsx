import React from 'react'
import { MainLayout } from '@components/main-layout'
import { Container, Typography, Box, Link } from '@material-ui/core'

const Contact = (): JSX.Element => {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
                <Link href="/about" color="secondary">
                    Go to the about page
                </Link>
            </Box>
        </Container>
    )
}

export default Contact
