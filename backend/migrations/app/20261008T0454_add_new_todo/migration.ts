#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/03ec5af52b03ccefe60fa962558af48413fce8e260320ac2ace205c50dcd7ced/contract';
import endContract from '../../snapshots/03ec5af52b03ccefe60fa962558af48413fce8e260320ac2ace205c50dcd7ced/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e7ee1656b76f303cf9b6eb50c758ede348b229dd979c83fd8a771684b6615a78/contract';
import startContract from '../../snapshots/e7ee1656b76f303cf9b6eb50c758ede348b229dd979c83fd8a771684b6615a78/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Todonew',
        columns: [
          col('completed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
