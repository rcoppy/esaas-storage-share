import { useTheme } from "@emotion/react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Photo from '../static/placeholders/storage_locker.webp';

export default function ListingCard({ listing }) {

    const theme = useTheme();
    const isDisplaySmall = useMediaQuery(theme.breakpoints.down('md'));

    const maxWidth = isDisplaySmall ? '76%' : '23%';

    const costString = listing.price
        .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '')
        .replace('.0', '');


    return <>
        <Card sx={{ width: maxWidth }}>
            <CardActionArea component={Link} to={`/listings/${listing.id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={Photo}
                    alt="storage locker"
                />
                <CardContent sx={{ textAlign: "left", maxHeight: 100 }}>
                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "1.3rem" }} variant="h5" component="div">
                        {listing.city}, {listing.state}, {listing.zipCode}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        <strong>${costString}
                            <span style={{ fontSize: "0.75rem" }}> / ft<sup>2</sup></span>
                        </strong>

                        {listing.squareFeet && <>, {listing.squareFeet}
                            <span style={{ fontSize: "0.75rem" }}> ft<sup>2</sup></span> available
                        </>}
                    </Typography>
                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} variant="body2" color="text.secondary">
                        {listing.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>;
}