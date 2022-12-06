import { useTheme } from "@emotion/react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Photo from '../static/placeholders/storage_locker.webp';
import { dateToMonthDayYear, formattedMoneyStylized } from "../utils/Formatters";

export default function LeaseCard({ listing, contract }) {

    const theme = useTheme();
    const isDisplaySmall = useMediaQuery(theme.breakpoints.down('md'));

    const maxWidth = isDisplaySmall ? '80%' : '23%';

    const costString = formattedMoneyStylized(contract.price); 


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
                    {/* <Typography gutterBottom variant="body2">
                        <strong>{costString}
                            <span style={{ fontSize: "0.75rem" }}> / ft<sup>2</sup></span>
                        </strong>
                    </Typography> */}
                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} variant="body2" color="text.secondary">
                        {dateToMonthDayYear(contract.startDate)} to {dateToMonthDayYear(contract.endDate)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>;
}