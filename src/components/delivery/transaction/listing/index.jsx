import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UploadButton from "../../../common/upload-button";
import { uploadRequirements } from "../../../../api/delivery";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2%",
  },
  divider: {
    background: "#F4F2F2",
  },
  textBlock: {
    padding: "13px 10px 7px",
  },
  filtersBlock: {
    padding: "35px 10px 15px",
  },
}));

const Listing = (props) => {
  const classes = useStyles();
  

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.textBlock}>
          <Typography variant="h6">{props.heading}</Typography>
        </div>
        <Divider className={classes.divider} />
        <Grid container className={classes.filtersBlock}>
          {props.list &&
            props.list.map(({id,label,success}) => (
              <Grid md={12} style= {{display:'flex',padding:'10px 0px'}}>
                <Grid item xs={12} sm={12} md={2}>
                    {label}
                </Grid>
                {
                    !success ? <Grid item xs={12} sm={12} md={6}>
                    <UploadButton
                      api={uploadRequirements}
                      callback={() => props.handleSuccess(id)}
                      id="upload-requirements"
                      buttonProps={{
                        variant: "contained",
                        style:{
                          background: '#F5E418',
                        }
                      }}
                    >
                      Upload File
                    </UploadButton>
                  </Grid> : <Grid style={{display:"flex"}} item xs={12} sm={12} md={10}>
                      <Grid item md={4}>
                      <Button disabled={true} style ={{background: "#00BFA5",color:'white'}}>File Uploaded Successfully </Button>
                      </Grid>
                      <Grid item md={2}>
                      <a href="">Download Report</a>
                      </Grid>
                      <Grid item md={2}>
                      <a href="">Download Invoice</a>
                      </Grid>
                  </Grid>
                }
                
              </Grid>
            ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Listing;
