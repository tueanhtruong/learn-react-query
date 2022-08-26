import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from 'mui-datatables';

import { IRootState } from 'src/redux/rootReducer';
import { TableBasic } from 'src/components/common';
import './styles.scss';
import appConfig from 'src/appConfig';

const Table: React.FC<Props> = ({
  isLoading,
  title,
  data,
  tableOptions,
  columns,
  refresh,
  defaultSortOrder,
  onAction,
}) => {
  const tableStateRef = useRef<MUIDataTableState>();

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const getFilterParams = (tableState?: MUIDataTableState) => {
    if (!tableState) return {};
    const params: any = {};

    tableState.filterList.forEach((filter: string[], idx: number) => {
      if (filter.length > 0) {
        const column = columns[`${idx}`];
        const name = column?.name;
        params[`${name}`] = filter;
      }
    });

    return params;
  };

  const getActionParams = () => {
    const tableState = tableStateRef.current;

    const rowsPerPage = tableState?.rowsPerPage || appConfig.ROWS_PER_PAGE;
    const page = tableState?.page || 0;
    const searchText = tableState?.searchText;

    const filterParams = getFilterParams(tableState);
    const params = {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      sort: tableState?.sortOrder.name || defaultSortOrder?.name,
      order: tableState?.sortOrder.direction || defaultSortOrder?.direction,
      search: searchText,
      ...filterParams,
    };

    return params;
  };

  const handleTriggerAction = () => {
    const params = getActionParams();
    onAction(params);
  };

  const handleTableChange = async (action: any, tableState: MUIDataTableState) => {
    tableStateRef.current = tableState;
    switch (action) {
      case 'changeRowsPerPage':
      case 'changePage':
      case 'sort':
      case 'search':
      case 'filterChange':
      case 'resetFilters':
        handleTriggerAction();
        break;
      default:
        break;
    }
  };

  return (
    <TableBasic
      title={title}
      data={data}
      columns={columns}
      options={tableOptions}
      onTableChange={handleTableChange}
      containerClassName="cmp-table"
      isLoading={isLoading}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    title: string;
    data: any[];
    tableOptions: MUIDataTableOptions;
    columns: MUIDataTableColumn[];
    refresh?: boolean | number | string;
    onAction: (...args: any[]) => void;
    defaultSortOrder?: MUISortOptions;
    isLoading?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Table));
