:: Licensed to the Apache Software Foundation (ASF) under one
:: or more contributor license agreements.  See the NOTICE file
:: distributed with this work for additional information
:: regarding copyright ownership.  The ASF licenses this file
:: to you under the Apache License, Version 2.0 (the
:: "License"); you may not use this file except in compliance
:: with the License.  You may obtain a copy of the License at
:: 
:: http://www.apache.org/licenses/LICENSE-2.0
:: 
:: Unless required by applicable law or agreed to in writing,
:: software distributed under the License is distributed on an
:: "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
:: KIND, either express or implied.  See the License for the
:: specific language governing permissions and limitations
:: under the License
<<<<<<< HEAD
@ECHO OFF
SET script_path="%~dp0run"
IF EXIST %script_path% (
        node %script_path% %*
) ELSE (
    ECHO.
    ECHO ERROR: Could not find 'run' script in 'cordova' folder, aborting...>&2
    EXIT /B 1
)
=======

@ECHO OFF
ECHO WARN: The `run` is not available for cordova-ios on windows machines.>&2
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
