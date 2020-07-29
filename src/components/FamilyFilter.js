import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _debounce from "lodash/debounce";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { Checkbox, FormControlLabel, Grid, Slider } from "@material-ui/core";
import {
    withModulesManager, formatMessage,
    FormattedMessage, PublishedComponent, ControlledField, TextInput
} from "@openimis/fe-core";

const styles = theme => ({
    dialogTitle: theme.dialog.title,
    dialogContent: theme.dialog.content,
    form: {
        padding: 0
    },
    item: {
        padding: theme.spacing(1)
    },
    paperDivider: theme.paper.divider,
});

class FamilyFilter extends Component {

    state = {
        showHistory: false,
    }

    constructor(props) {
        super(props)
        this.filterFamiliesOnMembers = this.props.modulesManager.getConf("fe-insuree", "filterFamiliesOnMembers", true)
    }

    debouncedOnChangeFilter = _debounce(
        this.props.onChangeFilters,
        this.props.modulesManager.getConf("fe-insuree", "debounceTime", 800)
    )

    _filterValue = k => {
        const { filters } = this.props;
        return !!filters && !!filters[k] ? filters[k].value : null
    }

    _onChangeShowHistory = () => {
        let filters = [
            {
                id: 'showHistory',
                value: !this.state.showHistory,
                filter: `showHistory: ${!this.state.showHistory}`
            }
        ];
        this.props.onChangeFilters(filters);
        this.setState((state) => ({
            showHistory: !state.showHistory
        }));
    }

    personFilter = (anchor) => {
        const { classes, onChangeFilters } = this.props;
        return (
            <Fragment>
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.chfId`} field={
                    <Grid item xs={1} className={classes.item}>
                        <TextInput
                            module="insuree" label={`Family.${anchor}.chfId`}
                            name={`${anchor}_chfId`}
                            value={this._filterValue(`${anchor}.chfId`)}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: `${anchor}.chfId`,
                                    value: v,
                                    filter: `${anchor}_ChfId_Istartswith: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.lastName`} field={
                    <Grid item xs={2} className={classes.item}>
                        <TextInput
                            module="insuree" label={`Family.${anchor}.lastName`}
                            name={`${anchor}_lastName`}
                            value={this._filterValue(`${anchor}.lastName`)}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: `${anchor}.lastName`,
                                    value: v,
                                    filter: `${anchor}_LastName_Icontains: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.givenName`} field={
                    <Grid item xs={2} className={classes.item}>
                        <TextInput
                            module="insuree" label={`Family.${anchor}.otherNames`}
                            name={`${anchor}_givenName`}
                            value={this._filterValue(`${anchor}.givenName`)}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: `${anchor}.givenName`,
                                    value: v,
                                    filter: `headInsuree_OtherNames_Icontains: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`InsureeFilter.${anchor}.gender`} field={
                    <Grid item xs={1} className={classes.item}>
                        <PublishedComponent
                            pubRef="insuree.InsureeGenderPicker"
                            withNull={true}
                            label={`Family.${anchor}.gender`}
                            value={this._filterValue(`${anchor}.gender`)}
                            onChange={v => onChangeFilters([
                                {
                                    id: `${anchor}.gender`,
                                    value: v,
                                    filter: !!v ? `${anchor}_Gender_Code: "${v}"` : null
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.phone`} field={
                    <Grid item xs={2} className={classes.item}>
                        <TextInput
                            module="insuree" label={`Family.${anchor}.phone`}
                            name={`${anchor}_phone`}
                            value={this._filterValue(`${anchor}.phone`)}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: `${anchor}.phone`,
                                    value: v,
                                    filter: `${anchor}_Phone_Icontains: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.email`} field={
                    <Grid item xs={2} className={classes.item}>
                        <TextInput
                            module="insuree" label={`Family.${anchor}.email`}
                            name={`${anchor}_email`}
                            value={this._filterValue(`${anchor}.email`)}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: `${anchor}.email`,
                                    value: v,
                                    filter: `${anchor}_Email_Icontains: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id={`FamilyFilter.${anchor}.dob`} field={
                    <Grid item xs={2}>
                        <Grid container>
                            <Grid item xs={6} className={classes.item}>
                                <PublishedComponent pubRef="core.DatePicker"
                                    value={this._filterValue(`${anchor}.dobFrom`)}
                                    module="insuree"
                                    label={`Family.${anchor}.dobFrom`}
                                    onChange={d => onChangeFilters([
                                        {
                                            id: `${anchor}.dobFrom`,
                                            value: d,
                                            filter: `${anchor}_Dob_Gte: "${d}"`
                                        }
                                    ])}
                                />
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <PublishedComponent pubRef="core.DatePicker"
                                    value={this._filterValue(`${anchor}.dobTo`)}
                                    module="insuree"
                                    label={`Family.${anchor}.dobTo`}
                                    onChange={d => onChangeFilters([
                                        {
                                            id: `${anchor}.dobTo`,
                                            value: d,
                                            filter: `${anchor}_Dob_Lte: "${d}"`
                                        }
                                    ])}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                } />
            </Fragment>
        )
    }

    familyHeadFilter = () => this.personFilter("headInsuree")
    familyMemberFilter = () => this.personFilter("members")

    render() {
        const { intl, classes, filters, onChangeFilters } = this.props;
        return (
            <Grid container className={classes.form}>
                <ControlledField module="insuree" id="FamilyFilter.location" field={
                    <Grid item xs={12} className={classes.item}>
                        <PublishedComponent
                            pubRef="location.DetailedLocationFilter"
                            withNull={true}
                            filters={filters}
                            onChangeFilters={onChangeFilters}
                            anchor="parentLocation"
                        />
                    </Grid>
                } />
                {this.familyHeadFilter()}
                {this.filterFamiliesOnMembers && this.familyMemberFilter()}
                <ControlledField module="insuree" id="FamilyFilter.poverty" field={
                    <Grid item xs={2} className={classes.item}>
                        <PublishedComponent pubRef="insuree.FamilyPovertyStatusPicker"
                            value={this._filterValue('poverty')}
                            onChange={v => onChangeFilters([
                                {
                                    id: 'poverty',
                                    value: v,
                                    filter: v === null ? null : `nullAsFalsePoverty: ${v}`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id="FamilyFilter.confirmationNo" field={
                    <Grid item xs={3} className={classes.item}>
                        <TextInput
                            module="insuree" label="Family.confirmationNo"
                            name="confirmationNo"
                            value={this._filterValue('confirmationNo')}
                            onChange={v => this.debouncedOnChangeFilter([
                                {
                                    id: 'confirmationNo',
                                    value: v,
                                    filter: `confirmationNo_Istartswith: "${v}"`
                                }
                            ])}
                        />
                    </Grid>
                } />
                <ControlledField module="insuree" id="FamilyFilter.showHistory" field={
                    <Grid item xs={2} className={classes.item}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.showHistory}
                                    onChange={e => this._onChangeShowHistory()}
                                />
                            }
                            label={formatMessage(intl, "insuree", "FamilyFilter.showHistory")}
                        />
                    </Grid>
                } />
            </Grid >
        )
    }
}

export default withModulesManager(injectIntl((withTheme(withStyles(styles)(FamilyFilter)))));